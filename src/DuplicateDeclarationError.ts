import ITypeCheckError from './ITypeCheckError'

/**
 * Class implements ITypeCheckError.
 * Handled Error type - Duplicate variable declaration
 */
class DuplicateDecalrationError implements ITypeCheckError {
  constructor(private variable:String){}

 /**
  * Error msg in textual format
  */
  public toString():String {
      return `Duplicate variable declaration: ${this.variable}`
  }
}

export default DuplicateDecalrationError