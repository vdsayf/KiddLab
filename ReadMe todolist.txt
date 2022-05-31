TO DO:
_____________________________________________________________________________________
IN RANKINGBORED many of the entries in data.csv have more columns than future ones.
	Old entries will have 26 columns, and have 5 columns that say "None"
	This is because there used to be 10 columns, 2 for each rated ID, 1 column representing the animal Response rating and 1 representing the Invisible Response rating
	The format was ID, animalRating, invisibleRating

		So if you saw ID, Number, "None"
			this would be an animal Rating entry
		Otherwise if you saw ID, "None", Number
			this would be an invisible Rating entry
		This would be true for all 5 IDs in that entry.

	But it was redundant. If you had rated one type of response, you wouldn't have rated the other type.
	Future entries in data.csv from RankingBored will have 22 columns. 
	There used to not be a condition column. But now the 5 redundant "None columns" will be gone

	Now the condition tells you which type of response was rated.
	The data has not been changed yet for SQLtoCSV.py 

_____________________________________________________________

If you want to add another prompt
	in Bored Engaged add another space for another answer in the response page
	in RankingBored add another condition and have the rater look at those responses 

Add another task for BoredEngaged:
	increase condition and add another html template

Decrease or Increase number of people rated at a time:
	Change amount of samp.id
	change "less than" "Greater than" values from 5

If you only want certain ratings in Ranking Bored
	For animal ratings, condition = 0
	For invisible ratings, condition = 1

______________________________________________________________________________

If you want more ratings:
	The problem with ratings right now is that it randomly chooses its 5 samples for people to rate.

	If you want this, 
		look for "//EDIT" in RankingBored. The section will have data.sort(comparingColumn) and a function comparingColumn
		And comment that part out.
		Then just run RankingBored

	Otherwise if you want to rate the responses that have been rated the least,
		This cannot be done automatically by just changing the task.js code and would require php that can change server-side files.


		look for "//EDIT" in RankingBored. The section will have data.sort(comparingColumn) and a function comparingColumn
		This section sorts the 2d array called "data"
		It sorts it by moving the least rated ones first in the array
		So the next time you run the experiment you are guaranteed to rate least rated ones.

		But if you just do that, the least rated ones will easily become the most rated ones,
		And you will still have the same problem where you still have ones that haven't been rated enough.

		So in between runs of the experiment, you must update "counts.csv" by using R and re-uploading the file.
		This can be be done:
			For our analysis.R, replace data.csv with a fresh data.csv
			Run R
			There should be a variable called counts in analysis.R
			Download counts as csv and replace counts.csv in RankingBored.

		You will have to do this multiple times until everyone gets equal number of ratings.

If you want to understand and change certain files, use the info files I have written.