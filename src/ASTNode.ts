import ASTVisitor from './ASTVisitor'
import IIterator from './IIterator'
import Stmt from './Stmt'
/**
 * Root of the AST Node hierarchy.  
 */
abstract class ASTNode {

  /**
   * create textual representation of the AST node
   */
  public abstract text() : string

  /**
   * Call to visitor.
   * @param visitor type of ASTVisitor
   */
  public abstract accept(visitor: ASTVisitor): void
  
  /**
   * Iterator function to return iterator of statements collected till this node.
   */
  public abstract stmtIterator() : IIterator<Stmt>
  
}

export default ASTNode