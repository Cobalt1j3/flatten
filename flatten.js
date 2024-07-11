function flatten(keyValues) {
	
	if (keyValues && typeof keyValues === 'object') {
		
		const	{ assign, getOwnPropertySymbols, keys } = Object,
				{ isArray } = Array,
				asArray = isArray(keyValues),
				ks = [ ...getOwnPropertySymbols(keyValues), ...keys(keyValues) ],
				{ length } = ks,
				results = [],
				tmp = [];
		let i,i0,l0,i1,l1,i2,l2,l3,l4,l5, k,v,v0;
		
		i = -1;
		while (++i < length) {
			
			i0 = -1, l0 = (isArray(v = keyValues[k = ks[i]]) ? v : (v = [ v ])).length,
			l4 = 0, l1 = results.length || 1;
			while (++i0 < l0) {
				
				i1 = -1, l2 = (v0 = flatten(v[i0])).length, l3 = 0;
				while (++i1 < l1) {
					
					i2 = -1, tmp.length = 0;
					while (++i2 < l2) (tmp[i2] = assign(asArray ? [] : {}, results[i1 + l3]))[k] = v0[i2];
					
					results.splice(i1 + l4, 1, ...tmp),
					i1 += (l5 = tmp.length - 1),
					l1 += l5;
					
				}
				
				l4 += i1--;
				
			}
			
		}
		
		return results;
		
	} else return [ keyValues ];
	
};