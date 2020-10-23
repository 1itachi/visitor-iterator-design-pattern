import ASTVisitor from './ASTVisitor'
import DeclStmt from './DeclStmt'
import Assignment from './Assignment'
import NumericLiteral from './NumericLiteral'
import Sequence from './Sequence'
import PlusExpr from './PlusExpr'
import StringLiteral from './StringLiteral'
import VarExpr from './VarExpr'
import Stmt from './Stmt'

/**
 * Class implements ASTVisitor interface. 
 * Collects all simple statements into an array.
 */
class CollectVisitor implements ASTVisitor{
    //Array to store all statements
    private listOfStatements: Array<Stmt>;

    constructor(){
        this.listOfStatements = new Array<Stmt>()
    }  

    //Collect all Declaration statements when visiting
    public visitDeclStmt(decl: DeclStmt): void {
        this.listOfStatements.push(decl)
    }

    //Collect all Assignment statements when visiting
    public visitAssignment( assign: Assignment): void {
        this.listOfStatements.push(assign)
    }
        
    //Do nothing as this is not a statement
    public visitNumericLiteral( numLiteral: NumericLiteral): void {}
       
    //Do nothing as this is not a statement
    public visitPlusExpr(plusExp: PlusExpr):void {}
       
    //Do nothing as we are only tracking simple statements
    public visitSequence(seq: Sequence): void {}

    //Do nothing as this is not a statement
    public visitStringLiteral( strLiteral: StringLiteral): void {}

    //Do nothing as this is not a statement
    public visitVarExpr(varExp: VarExpr):void {} 

    //Returns all statements collected
    public getNodes() : Array<any> {
        return this.listOfStatements;
    }

    

}

export default CollectVisitor;