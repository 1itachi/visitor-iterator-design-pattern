import Expr from './Expr'

/**
 * ASTNode representing a literal 
 */
interface LiteralExpr extends Expr {
  text() : string
}

export default LiteralExpr