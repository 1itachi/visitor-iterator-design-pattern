import Expr from './Expr'
import Stmt from './Stmt'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';

/**
 * ASTNode representing a binary "+" expression 
 */
class PlusExpr implements Expr {
  constructor(private left: Expr, private right: Expr){ }

  /**
   * Textual representation of parameters
   */
  public text() : string {
       return this.left.text() + " + " + this.right.text(); 
  }


  /**
   * Call visitor function for this node and the left and right expressions
   * @param v type of ASTVisitor
  */
  public accept(v: ASTVisitor) : void {
    v.visitPlusExpr(this);
    this.left.accept(v);
    this.right.accept(v);
  }

  /**
   * Function to return Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    return new StatementIterator(nodesVisitor.getNodes())  
  }
}

export default PlusExpr