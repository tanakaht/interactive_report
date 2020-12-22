def is_time_related(datafact1, datafact2, rate=0.5):
    ret = []
    from_1, to_1 = datafact1['from_'], datafact1['to_']
    from_2, to_2 = datafact2['from_'], datafact2['to_']
    if None in [from_1, to_1, from_2, to_2]:
        return False
    and_ts = max(0, min(to_1, to_2)-max(from_1, from_2))
    or_ts = max(0, max(to_1, to_2)-min(from_1, from_2)) # 重複なしならand_ts=0なので考えないで良い
    return and_ts/or_ts>=rate

is_country_related = lambda datafact1, datafact2: datafact1['country']==datafact2['country']
is_ind_related = lambda datafact1, datafact2: datafact1['ind']==datafact2['ind']
is_ptype_related = lambda datafact1, datafact2: datafact1['ptype']==datafact2['ptype']

attr2flag = dict(country=is_country_related,
                time=is_time_related,
                ind=is_ind_related,
                ptype=is_ptype_related)

def find_related_datafacts(datafact, datafacts, attrs):
    ret = []
    def is_related(datafact1, datafact2):
        for f in map(lambda attr: attr2flag[attr], attrs):
            if not f(datafact1, datafact2):
                return False
        return True
    for d in datafacts:
        if is_related(d, datafact):# and d!=datafact:
            ret.append(d)
    return ret
    d = {"text": "these countries's", "focusArgs": datafact["focusArgs"]}
    for i in ret:
        d['focusArgs'][1] += [i["country"]]
    return [ret[0], d]

