# -*- coding: utf-8 -*-
"""
Created on Sat Nov 28 08:49:57 2015

@author: Owner
"""

import numpy as np
import pandas as pd

roster = pd.read_csv("data/output/dataset.csv", encoding='ISO-8859-1')
roster_stats = pd.read_csv("data/cfl_data/cfl_roster_stats.csv", encoding='ISO-8859-1')
roster_stats = roster_stats.fillna(0)

df = pd.merge(roster, roster_stats, left_on='ID', right_on='roster_id', how='outer')
df = df.dropna()

df.to_csv("data/output/dataset2.csv", na_rep="NA", index=False)