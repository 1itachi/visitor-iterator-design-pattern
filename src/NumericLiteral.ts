import ASTVisitor from './ASTVisitor';
import LiteralExpr from './LiteralExpr';
import IIterator from './IIterator';
import CollectVisitor from './CollectVisitor';
import StatementIterator from './StatementIterator';
import Stmt from './Stmt';

/**
 * ASTNode representing a numeric literal 
 */
class NumericLiteral implements LiteralExpr {
  constructor(private value: number){
  }
  
  /**
   * Textual representation of parameters
   */
  text() : string {
    return this.value.toString();
  }


  /**
   * Call visitor function.
   * @param v type of ASTVisitor
  */
  public accept(v: ASTVisitor) : void {
    v.visitNumericLiteral(this);
  }


  /**
   * Function to return Iterator of nodes collected.
   */
  public stmtIterator() : IIterator<Stmt>{
    let nodesVisitor = new CollectVisitor();
    return new StatementIterator(nodesVisitor.getNodes())  
  }

}

export default NumericLiteral