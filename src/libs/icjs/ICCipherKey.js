import { BigInteger } from './jsbn';
import { ICRandom } from './ICRandom';
import { ICMath } from './ICMath';
import { ICBuffer } from './ICBuffer';

const _p = new BigInteger('C785650493E1E736C482FD9F125176EF53E315EA71CCC52098F0D9D512F63B2F', 16);
const _q = new BigInteger('6071a4ef45b4047a033485fabee04d0efb9ca6914d49d010c4033790ebe7866d', 16);
const _r = new BigInteger('f09e19dfcb6b66eec7f86b88d8fd8ef7e1c3a6096e336766266e10856908c5d9', 16);

const bigIntegerToArray = (bigInteger, length) => {
  let byteArray = bigInteger.toByteArray();
  if (byteArray.length < length) {
    for (let i = byteArray.length; i < length; i++) {
      byteArray.unshift(0);
    }
  } else if (byteArray.length > length) {
    byteArray = byteArray.slice(byteArray.length - length);
  }
  return byteArray;
};

export class ICCipherKey {
  constructor() {
    this._privateKey = new BigInteger(ICRandom.generate(32).toHex(), 16);
    this._publicKey = ICMath.modPow(_q, this._privateKey, _r, _p);
  }

  static dh(privateKey, publicKey) {
    const res = ICMath.modPow(new BigInteger(publicKey, 16), new BigInteger(privateKey, 16), _r, _p);
    return ICBuffer.createBuffer(bigIntegerToArray(res, 32));
  }

  getPrivateKey() {
    return ICBuffer.createBuffer(bigIntegerToArray(this._privateKey, 32));
  }

  getPublicKey() {
    return ICBuffer.createBuffer(bigIntegerToArray(this._publicKey, 32));
  }
}
