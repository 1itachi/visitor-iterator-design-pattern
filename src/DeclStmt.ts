import Stmt from './Stmt'
import ASTVisitor from './ASTVisitor'
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';

/**
 * ASTNode representing a variable declaration  
 */
class DeclStmt implements Stmt {
  constructor(private varName : string){ }
  
  /**
   * Textual representation of parameters
   */
  public text() : string {
    return "declare " + this.varName;
  }

  
  /**
   * Call visitor function.
   * @param v type of ASTVisitor
   */
  public accept(v: ASTVisitor) : void {
    v.visitDeclStmt(this);
  }

  
  /**
   * Function to return Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    this.accept(nodesVisitor);
    return new StatementIterator(nodesVisitor.getNodes())  
  }

}

export default DeclStmt