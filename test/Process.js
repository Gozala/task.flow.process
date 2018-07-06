/* @flow */

import Process from "../"
import test from "blue-tape"

test("test baisc", async test => {
  test.isEqual(typeof Process, "object")
})
