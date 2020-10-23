import LiteralExpr from './LiteralExpr'
import ASTVisitor from './ASTVisitor'
import Stmt from './Stmt';
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';

/**
 * ASTNode representing a string literal 
 */
class StringLiteral implements LiteralExpr {
  constructor(private literal : string){ }
  
  /**
   * Textual representation of parameters
   */
  public text() : string {
    return "\"" + this.literal + "\"";
  }  

  /**
   * Call visitor function.
   * @param v type of ASTVisitor
  */
  public accept(v: ASTVisitor) : void {
    v.visitStringLiteral(this);
  }


   /**
   * Function to return Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    return new StatementIterator(nodesVisitor.getNodes())  
  }
}

export default StringLiteral