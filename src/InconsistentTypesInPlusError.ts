import ITypeCheckError from './ITypeCheckError'
import Expr from './Expr'

/**
 * Class implements ITypeCheckError.
 * Handled Error type - Type error in expression
 */
class InconsistentTypesInPLusError implements ITypeCheckError {
  constructor(private expr:Expr){}

  /**
  * Error msg in textual format
  */
  public toString():String {
      return `Type error in expression: ${this.expr.text()}`
  }
}

export default InconsistentTypesInPLusError