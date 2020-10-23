/**
 * interface defining the API for iterators.
 */
interface IIterator<T> {
  /**
   * Checks if there is an element, 
   * true if present else false
   */
  hasNext() : boolean

  /**
   * Returns the node - statement
   */
  next() : T
}

export default IIterator