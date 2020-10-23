import Expr from './Expr'
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';
import Stmt from './Stmt';

/**
 * ASTNode representing a variable 
 */
class VarExpr implements Expr {
  constructor(private varName: string){ }
  
  /**
   * Textual representation of parameters
   */
  public text() : string {
       return this.varName; 
  } 

  /**
   * Call visitor function.
   * @param v type of ASTVisitor
  */
  public accept(v: ASTVisitor) : void {
    v.visitVarExpr(this);
  }

  
  /**
   * Function to return Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    return new StatementIterator(nodesVisitor.getNodes())  
  }
}

export default VarExpr