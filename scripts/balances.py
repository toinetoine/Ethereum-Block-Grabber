import os
import sys
import argparse
import re
import json
import operator

parser = argparse.ArgumentParser(description='Gets the top <number> of accounts ranked by etherum balance.')
parser.add_argument('--directory', help='path to the directory containing the block files')

args = parser.parse_args()
if(args.directory == None):
    print "missing arguments..."
    sys.exit()

balances = {}
json_file_ext_expr = re.compile('^.*\.json$')

# update block statuses (True = have valid .json file for them in block_files_path, False = missing)
for filename in os.listdir(args.directory):
    if(json_file_ext_expr.match(filename)):
        with open(args.directory + os.sep + filename, 'r') as blockfile:
            try:
                blockdata = json.loads(blockfile.read())

                if blockdata != None and 'transactions' in blockdata.keys() and type(blockdata['transactions']) is list:
                    for transaction in blockdata['transactions']:
                        if 'from' in transaction and 'to' in transaction and 'value' in transaction:
                            sending_account = transaction['from']
                            recipient_account = transaction['to']
                            amount = int(transaction['value'])

                            if sending_account not in balances.keys():
                                balances[sending_account] = 0
                            if recipient_account not in balances.keys():
                                balances[recipient_account] = 0

                            balances[sending_account] -= amount
                            balances[recipient_account] += amount
                        else:
                            if 'hash' in blockdata['transactions']:
                                print 'Warning: transaction ' + transaction['hash'] + ' failed to be recorded'
                            else:
                                print 'Warning: transaction without hash failed to be recorded'
            except ValueError:
                print 'Decoding json failed for file: ' + (args.directory + os.sep + filename)

result_config_file = open('balances.txt', 'w')
result_config_file.write('account,balance\n')
for account, balance in reversed(sorted(balances.items(), key=operator.itemgetter(1))):
    result_config_file.write(account + ',' + str(balance) + '\n')
result_config_file.close()
