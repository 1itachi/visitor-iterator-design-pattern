import ASTVisitor from './ASTVisitor'
import DeclStmt from './DeclStmt'
import Assignment from './Assignment'
import NumericLiteral from './NumericLiteral'
import Sequence from './Sequence'
import PlusExpr from './PlusExpr'
import StringLiteral from './StringLiteral'
import VarExpr from './VarExpr'
import ITypeCheckError from './ITypeCheckError'
import DuplicateDecalrationError from './DuplicateDeclarationError'
import InconsistentTypesInPLusError from './InconsistentTypesInPlusError'

/**
 * Class implements AST visitor interface
 * Checks for errors such as Duplicate declaration and inconsistent types when visiting all nodes
 * of Abstract Syntax Trees
 */
class TypeCheckVisitor implements ASTVisitor {
    //List of errors
    private errors:Array<ITypeCheckError> = [];

    //set fo declaration statements
    private declarations:Set<String> = new Set();

    constructor(){}

/**
 * Duplication error is created and pushed to lsit of errors if the 
 * declaration statement is already present in the set
 * @param decl declaration statement
 */
public visitDeclStmt(decl: DeclStmt): void {
    let varName = decl.text().split(" ")[1]
    if(this.declarations.has(varName)){
        this.errors.push(new DuplicateDecalrationError(varName))
    }else{
        this.declarations.add(varName)
    }
}

public visitAssignment( assign: Assignment): void {}

public visitNumericLiteral( numLiteral: NumericLiteral): void {}

/**
 * Type error is created and added to the list of errors if 
 * one operand is a NumericLiteral and the other is a StringLiteral
 * 
 * @param plusExp expression to be checked for errors
 */
public visitPlusExpr(plusExp: PlusExpr):void {
    let expressions = plusExp.text().split("+")
    let exp1 = parseInt(expressions[0])
    let exp2 = parseInt(expressions[1])
    if(isNaN(exp1) != isNaN(exp2) && 
    (expressions[1].includes("\"") || expressions[0].includes("\""))){
        this.errors.push(new InconsistentTypesInPLusError(plusExp))
    }
}

public visitSequence(seq: Sequence): void {}

public visitStringLiteral( strLiteral: StringLiteral): void {}

public visitVarExpr(varExp: VarExpr):void {} 

/**
 * Returns all errors collected after visitng all nodes of AST
 */
public getErrors() : Array<ITypeCheckError>{
    return this.errors;
}

}

export default TypeCheckVisitor;