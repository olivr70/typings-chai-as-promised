# typings-chai-as-promised
A Typescript binding for chai-as-promised. 

This is defined as an external Typescript module. It is a near identical port of [DefinitelyTypes/chai-as-promised](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/chai-as-promised) 
subproject initially provided by @jt000 as an ambient Typescript module.

## Motivation

TSD is being deprecated and replaced by Typings. Typings can import ambient modules from DefinitelyTypes, but mixing ambient
and external modules is not well supported. 

As chai-as-promised provides extensions to chai types, and chai has already moved to an external module
for Typings, it is necessary to port chai-as-promised.d.ts
