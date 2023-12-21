


var text = '{ "employees" : [' +
'{ "firstName":"John" , "lastName":"Doe" },' +
'{ "firstName":"Anna" , "lastName":"Smith" },' +
'{ "firstName":"Peter" , "lastName":"Jones" } ]}';

var obj1 = JSON.parse(text);

var bf = new Blowfish('key12345');
var encrypted = bf.encrypt( JSON.stringify(obj1) );
var decrypted = bf.decrypt(encrypted);

// error SyntaxError: Unexpected token
var obj2 = JSON.parse(bf.trimZeros(decrypted));

console.log(obj2);


