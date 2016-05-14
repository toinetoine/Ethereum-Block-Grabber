import os
import sys
import argparse
import re
import json

parser = argparse.ArgumentParser(description='Gets the missing block numbers and creates a config file for them.')
parser.add_argument('--directory', help='path to the directory containing the block files')
parser.add_argument('--maxblock', type=int, help='the block number to find missing blocks up to')



args = parser.parse_args()
if(args.directory == None or args.maxblock == None):
	print "missing arguments..."
	sys.exit()

block_numbers_statuses = [False] * args.maxblock
json_file_ext_expr = re.compile('^.*\.json$')

# update block statuses (True = have valid .json file for them in block_files_path, False = missing)
for filename in os.listdir(args.directory):
	if(json_file_ext_expr.match(filename)):
		with open(args.directory + os.sep + filename, 'r') as blockfile:
		    try:
		    	blockdata = json.loads(blockfile.read())

		    	if(blockdata['number'] < args.maxblock):
		    		block_numbers_statuses[blockdata['number']] = True;

		    except UnicodeDecodeError as ude:
		        None

# show missing
missing_blocks = list()
missing_blocks_streak = list()
for i in range(len(block_numbers_statuses)):
	if not block_numbers_statuses[i]:
		streak_broken = False
		if len(missing_blocks_streak) > 0:
			streak_broken = (missing_blocks_streak[-1] != i - 1)


		# is streak broken -> 
			#	add the streak list to missing blocks and clear the streak list
		if streak_broken:
			if len(missing_blocks_streak) < 2:
				missing_blocks.append(i)
			else:
				missing_blocks.append({'start': missing_blocks_streak[0], 'end': missing_blocks_streak[-1]+1})
			missing_blocks_streak = list()
			
		missing_blocks_streak.append(i)

# write remaining missing block numbers in streak list
if len(missing_blocks_streak) < 2:
	missing_blocks.append(i)
else:
	missing_blocks.append({'start': missing_blocks_streak[0], 'end': missing_blocks_streak[-1]+1})

# write config file with the missing blocks
config_obj = {}
config_obj['blocks'] = missing_blocks

result_config_file = open('config.json', 'w')
result_config_file.write(json.dumps(config_obj, sort_keys=True, indent=4, separators=(',', ': ')))
result_config_file.close()


