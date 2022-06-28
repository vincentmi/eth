const randomBytes = require('randombytes')
const secp256k1 = require('secp256k1')
const keccak = require('keccak')

/**
* 产生32字节随机数.
* @returns {Buffer} private key: a 32 bytes buffer
*/
const createRandomPrivateKey = function () {
    const privateKey = randomBytes(32)
    return privateKey
}

const privateKeyToAddress = function (privateKey) {
    // 32 bytes of private key buffer to generate 65 bytes of public key.
    // Get rid of 0x04 at the begin of public key. (65-1=64 bytes remains)
    const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1)
    // Take right-most 20 bytes and turn to hex representation.
    return keccak('keccak256').update(Buffer.from(publicKey)).digest().slice(-20)
}

const toChecksunAdd = function (address) {
    address = address.toLowerCase().replace('0x', '')
    var hash = keccak('keccak256').update(address).digest('hex')
    var ret = '0x'
  
    for (var i = 0; i < address.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += address[i].toUpperCase()
      } else {
        ret += address[i]
      }
    }
  
    return ret
  }

const genAccount = function(){
    var pk = createRandomPrivateKey();
    var add = privateKeyToAddress(pk)
    console.log("\nPK :",pk.toString("hex"),"\nADD:",toChecksunAdd(add.toString("hex")))
}


const samplePk=     Buffer.from("bdb2c8d55b47e7c37dabdead589eec3d463b2de656ed6ba9b75143e72180ae09","hex")
const sampleAdd = privateKeyToAddress(samplePk)

console.log("sample-address:",sampleAdd.toString("hex"))


for(var i = 0 ;i<100;i++){
    genAccount()
}

console.log(toChecksunAdd("c40e24f1ae49fda0c6e7bd243337e0f43ac0ad81"))
console.log(toChecksunAdd("5e00b4e110975f62414aae1f7ef9a959cb4782b7"))