# 概要
　第一引数 *keyValues* に指定された値を一定の規則に基づいて展開する。*keyValues* の値がプリミティブな値だった場合、それは単に [Array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array) にラップされて返される。値が [Object](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object) だった場合、そのプロパティの値に Array を指定して任意の数の値を列挙すると、展開後に、その値をそれぞれそのプロパティの値として示す Object が、その Array のプロパティ [length](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/length) が示す数だけ複製される。
```javascript
flatten({ a:[ 0, 1, 2 ] }); // [ { a: 0 }, { a: 1 }, { a: 2 } ]
```
　別のプロパティも同じように指定されている場合、それらのすべての組み合わせで複製された Object で列挙された Array を返す。
```javascript
flatten({ a: [ 0, 1, 2 ], b: [ 'hi', 'ho' ] });

// [ { a: 0, b: 'hi' }, { a: 1, b: 'hi' }, { a: 2, b: 'hi' }, { a: 0, b: 'ho' }, { a: 1, b: 'ho' }, { a: 2, b: 'ho' } ]
```
　プロパティの値が Array だった場合、そのままだとその要素が従前のように展開されてしまうので、あらかじめ Array でラップして保護する必要がある。
```javascript
flatten( { a: [ 0, 1, 2 ] });		// [ { a: 0 }, { a: 1 }, { a: 2 } ]
flatten( { a: [ [ 0, 1, 2 ] ] });	// [ { a: [ 0, 1, 2 ] } ]
```
　引数のオブジェクトはネストすることもできる。
```javascript
flatten( { a: { a: [ 0, 1, 2 ] } });	// [ { a: { a: 0 } }, { a: { a: 1 } }, { a: { a: 2 } } ]
```
　引数に Array を指定することもでき、その場合は各要素をプロパティとして取り扱い、Object のプロパティに指定された Array と同様の展開が行なわれる。
```javascript
flatten( [ 0, 1, 2 ]);		// [ [ 0, 1, 2 ] ]
flatten([ [ 0, 1, 2 ] ]);	// [ [ [ 0 ], [ 1 ], [ 2 ] ] ]

// これらは一見すると直感的な結果ではないかもしれないが、以下のように Object に置き換えて考えると妥当であることがわかる。
// [ 0, 1, 2 ] = { '0': 0, '1': 1, '2': 2 } であるとすれば、
// flatten({ '0': 0, '1': 1, '2': 2 }) の結果は [ { '0': 0, '1': 1, '2': 2 } ] になり、つまり [ [ 0, 1, 2 ] ] になる。
// 一方 [ [ 0, 1, 2 ] ] は、{ '0': [ 0, 1, 2 ] } と考えられるため、結果は [ { '0': 0 }, { '0': 1 }, { '0': 2 } ] なので、[ [ 0 ], [ 1 ], [ 2 ] ] になる。
```