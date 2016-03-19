///<reference path="typings/main.d.ts"/>


import * as chai from "chai";
import { assert, expect, ExpectStatic } from "chai";
import { PromisesAPlus } from "promises-a-plus";
import { LanguageChains, NumericComparison, TypeComparison } from 'chai';
// import * as chaip from "chai-as-promised";
import chaip = require("chai-as-promised");
chai.use(<any>chaip);

import { Promise } from "es6-promise";

const testError = new Error("Expected failure");

function resolveAfter<T>(value:T, delay:number=10):PromisesAPlus.Thenable<T> {
  return new Promise( (resolve, reject) => {
    setTimeout( function () { resolve(value) }, delay);
  })
}
function rejectAfter<T>(err:Error, delay:number=10):PromisesAPlus.Thenable<T> {
  return new Promise( (resolve, reject) => {
    setTimeout( function () { reject(err) }, delay);
  })
}
var originalState = { transferPromissness :  chaip.transferPromiseness
    , transformAsserterArgs : chaip.transformAsserterArgs 
};

afterEach( function () {
  chaip.transferPromiseness = originalState.transferPromissness;
  chaip.transformAsserterArgs = originalState.transformAsserterArgs;
})

describe("chai-as-promised", function () {
  describe("assert", function () {
    it("should support isRejected", function () {
      return assert.isRejected(rejectAfter(testError));
    })
    it("should support isFulfilled", function () {
      return assert.isFulfilled(resolveAfter(2));
    })
    it("should support becomes", function () {
      return assert.becomes(resolveAfter(2), 2);
    })
    it("should support doesNotBecome", function () {
      return assert.doesNotBecome(resolveAfter(2), 4);
    })
  });
  describe("expect", function () {
    describe("eventually", function () {
      it(" should work with equal", function () {
        return expect(resolveAfter(10)).to.eventually.equal(10);
      });
      it(" should work with not.equal", function () {
        return expect(resolveAfter(10)).to.eventually.not.equal(20);
      });
      it(" should work with have property", function () {
        return expect(Promise.resolve({ foo: "hello" })).to.eventually.have.property("foo");
      });
    });
    it("should support fulfilled", function () {
      return expect(resolveAfter(10)).to.be.fulfilled;
    })
    it("should support rejected", function () {
      return expect(rejectAfter(testError)).to.be.rejected;
    })
    it("should support rejectedWith", function () {
      return expect(rejectAfter(testError)).to.be.rejectedWith(testError);
    })
  });

  describe("with Promise.all", function () {
    it("should pass multiple", function () {
      return Promise.all([
        expect(resolveAfter(10)).to.eventually.equal(10)
        , expect(resolveAfter(20)).to.eventually.equal(20)]);
    });
    it(" should fail if one the inner promises fails", function () {
        expect( Promise.all([
          expect(resolveAfter(10)).to.eventually.equal(10)
          , expect(resolveAfter(20)).to.eventually.equal(21)
        ])).to.be.rejected;
    });
  })
  
  describe("using Promise.all", function () {
    
    it("should pass multiple", function () {
      return Promise.all([
        expect(resolveAfter(10)).to.eventually.equal(10)
        , expect(resolveAfter(20)).to.eventually.equal(20)]);
    });
    it(" should fail if one the inner promises fails", function () {
        return expect( Promise.all([
          expect(resolveAfter(10)).to.eventually.equal(10)
          , expect(resolveAfter(20)).to.eventually.equal(21)
        ])).to.be.rejected;
    });
  })
  describe("customizing functions", function () {
    describe("transformAsserterArgs", function() {
      it("should support changing", function () {
        chaip.transformAsserterArgs = function (args) {
          var argsArray = Array.prototype.slice.call(args);
          return argsArray.map( (x) => typeof x === "number" ? x * 2 : x );
        }
        return expect(resolveAfter(24)).to.eventually.equal(12);
      })
      it("should support changing to numbers", function () {
        chaip.transformAsserterArgs = function (args) {
          var argsArray = Array.prototype.slice.call(args);
          return Promise.all(argsArray);
        }
        return expect(resolveAfter(12)).to.eventually.equal(12);
      })
      it("should support changing to Promises", function () {
        chaip.transformAsserterArgs = function (args) {
          var argsArray = Array.prototype.slice.call(args);
          return Promise.all(argsArray);
        }
        return expect(resolveAfter(12)).to.eventually.equal(resolveAfter(12));
      })
    })
  })
});


// Promise.resolve(2+2).should.eventually.equal(4);

// // Assertion properly extended
// var a:chai.Assertion;
// a.eventually.equal(10);

// var z:ExpectStatic;

// var a:chaip.

// z(10).should.not.approximately(11,2);

// var x:chai.Assertion;
// var x_:chai.AssertionExt;
// x=x_;
// x_=x;

// var as:chai.AssertStatic;

// var y = expect(10);;

// x = y;
// y = x;

