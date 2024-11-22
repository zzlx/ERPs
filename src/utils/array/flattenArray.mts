/**
 * *****************************************************************************
 *
 * Flatten an array, with the ability to define a depth.
 *
 * *****************************************************************************
 */

export function flattenArray (array, depth) {
  if (depth == null) {
    return flattenForever(array, [])
  }

  return flattenWithDepth(array, [], depth)
}

/**
 * Recursive flatten function with depth.
 */

function flattenWithDepth (array, result, depth) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i]

    if (depth > 0 && Array.isArray(value)) {
      flattenWithDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * Recursive flatten function. Omitting depth is slightly faster.
 */
function flattenForever (array, result) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i]

    if (Array.isArray(value)) {
      flattenForever(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}
