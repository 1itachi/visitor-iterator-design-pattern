import ASTVisitor from './ASTVisitor'
import DeclStmt from './DeclStmt'
import Assignment from './Assignment'
import NumericLiteral from './NumericLiteral'
import Sequence from './Sequence'
import PlusExpr from './PlusExpr'
import StringLiteral from './StringLiteral'
import VarExpr from './VarExpr'

/**
 * Class implements ASTVisitor.
 * Counts the number of times a node is visited.
 */
class CountVisitor implements ASTVisitor {

    constructor(private nrDeclStmt =0,
                private nrAssignment = 0,
                private nrNumericLiteral = 0,
                private nrStringLiteral = 0,
                private nrVarExpr = 0,
                private nrSequence = 0,
                private nrPlusExpr = 0
    ){}

    public visitDeclStmt(decl: DeclStmt): void {
        this.nrDeclStmt++;
    }

    public visitAssignment( assign: Assignment): void {
        this.nrAssignment++;
    }
        
    public visitNumericLiteral( numLiteral: NumericLiteral): void {
        this.nrNumericLiteral++;
    }
       
    public visitPlusExpr(plusExp: PlusExpr):void {
        this.nrPlusExpr++;
    }
       
    public visitSequence(seq: Sequence): void {
        this.nrSequence++;
    }

    public visitStringLiteral( strLiteral: StringLiteral): void {
        this.nrStringLiteral++;
    }

    public visitVarExpr(varExp: VarExpr):void {
        this.nrVarExpr++;
    } 

    public getNrAssignment() : number {
        return this.nrAssignment;
    }

    public getNrDeclStmt() : number {
        return this.nrDeclStmt;
    }

    public getNrNumericLiteral() : number {
        return this.nrNumericLiteral;
    }

    public getNrPlusExpr() : number {
        return this.nrPlusExpr;
    }

    public getNrSequence() : number {
        return this.nrSequence;
    }

    public getNrStringLiteral() : number {
        return this.nrStringLiteral;
    }

    public getNrVarExpr(): number {
        return this.nrVarExpr;
    } 

}

export default CountVisitor;