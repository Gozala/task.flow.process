// @flow

// import Task from "task.flow"
import type { Task } from "task.flow"
import type { CurrentProcess } from "@task.flow/process"
import { succeed, fail } from "task.flow"
import Process from "@task.flow/process"
import ThreadPool from "@task.flow/thread-pool"

const work = (process: CurrentProcess<string, string>): Task<empty, void> => {
  const receive = () => {
    return process.reader
      .read()
      .chain(message => {
        console.log("read", message)
        return process.writer.write(`echo ${message}`)
      })
      .capture(error => process.exit())
      .chain(receive)
  }

  return receive()
}

const main = Process.spawn(work).chain(process => {
  return process.writer.write("hello").chain(() => {
    return process.reader.read()
  })
})

ThreadPool.promise(main) //?
