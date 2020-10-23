import Stmt from './Stmt';
import ASTVisitor from './ASTVisitor';
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';

/**
 * ASTNode representing a sequence of statements.
 */
class Sequence implements Stmt{
  constructor(private stat1: Stmt, private stat2: Stmt){ }
  
  /**
   * Textual representation of parameters
   */
  public text() : string {
    return this.stat1.text() + "; " + this.stat2.text();
  }


  /**
   * Call visitor function for this node and the left and right statements
   * @param v type of ASTVisitor
  */
  public accept(v: ASTVisitor) : void {
    v.visitSequence(this);
    this.stat1.accept(v);
    this.stat2.accept(v);
  }

  /**
   * Visit other nodes except this node 
   * (we are considering only simple statements for iterations)
   *  Returns Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    this.stat1.accept(nodesVisitor)
    this.stat2.accept(nodesVisitor)
    return new StatementIterator(nodesVisitor.getNodes())  
  }
 

}

export default Sequence