import Stmt from './Stmt'
import Expr from './Expr'
import ASTVisitor from './ASTVisitor'
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';


/**
 * ASTNode representing an assignment statement  
 */
class Assignment implements Stmt {
  /**
   * Constructor for Assignment.
   * @param varName varibale name
   * @param exp expression
   */
  constructor(private varName: string, private exp: Expr){ }
  
  /**
   * Textual representation of parameters
   */
  public text() : string {
    return this.varName + " = " + this.exp.text();
  } 


  /**
   * Call visitor function.
   * @param v type of ASTVisitor
   */
  public accept(v: ASTVisitor) : void {
    v.visitAssignment(this);
    this.exp.accept(v);
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

export default Assignment