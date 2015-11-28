# -*- coding: utf-8 -*-
"""
Created on Fri Nov 27 23:41:40 2015

@author: Owner
"""

import numpy as np
import pandas as pd
import patsy
from scipy.spatial import distance

roster = pd.read_csv("data/output/dataset.csv", encoding='ISO-8859-1')
roster = roster.dropna()

user = pd.read_json("data/input.json")

roster = roster.append(user)

roster['height'] = pd.cut(roster['height'], [-0.01, 5.3, 5.6, 5.9, 6.2, 100], labels=["very_short", "short", "medium", "tall", "very_tall"])
roster['weight'] = pd.cut(roster['weight'], [-0.01, 210, 280, 350, 420, 1000], labels=["very_light", "light", "medium", "heavy", "very_heavy"])

# Turn features into 1's and 0's
roster2 = roster.drop(['ID'], axis=1)
all_columns = "+".join(roster2.columns)
roster2 = patsy.dmatrix(all_columns + " - 1", roster2, return_type='dataframe')

# Combine it with the first two columns (hashes)
roster1 = roster[['ID']]
roster = pd.concat([roster1, roster2], axis=1)

# Split it into roster and user data frames
user = roster.loc[roster['ID'] == -1]
user = user.drop(['ID'], axis=1)
roster = roster.loc[roster['ID'] != -1]

# Convert them into numpy arrays
roster_mat = roster.as_matrix(roster.columns.difference(['ID']))
user_mat = user.as_matrix(user.columns.difference(['ID']))

similarity = distance.cosine(roster_mat, user_mat.T)