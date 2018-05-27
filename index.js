import reduceValues from "@unction/reducevalues"
import replaceWhen from "@unction/replacewhen"
import isNil from "@unction/isnil"
import dig from "@unction/dig"

import type {ArrayType} from "types"
import type {UnfinishedKeyChainType} from "types"
import type {UnaryFunctionType} from "types"
import type {KeyedEnumerableType} from "types"
import type {ValueType} from "types"
import type {KeyChainType} from "types"

export default function cascadingKeyChain (keychains: ArrayType<UnfinishedKeyChainType>): UnaryFunctionType {
  return function cascadingKeyChainChains (tree: KeyedEnumerableType): ValueType {
    return reduceValues(
      (filler: ValueType | null): UnaryFunctionType => (keychain: KeyChainType): ValueType => {
        if (isNil(filler)) {
          return dig(keychain)(tree)
        }

        return dig(replaceWhen(isNil)(filler)(keychain))(tree)
      }
    )(
      null
    )(
      keychains
    )
  }
}
