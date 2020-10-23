import { CodeFixAction } from "typescript";
import Assignment from "./Assignment";
import DeclStmt from "./DeclStmt";
import NumericLiteral from "./NumericLiteral";
import PlusExpr from "./PlusExpr";
import Sequence from "./Sequence";
import StringLiteral from "./StringLiteral";
import VarExpr from "./VarExpr";

/**
 * ASTVisitor interface to keep track of nodes visited
 */
interface ASTVisitor {
    /**
     * Variable declaration statement visitor function 
     * @param decl varible declaration statement
     */
    visitDeclStmt(decl: DeclStmt): void;

    /**
     * Assignement statement visitor function
     * @param assign Assignment statement visitor function
     */
    visitAssignment( assign: Assignment): void;

    /**
     * Numeric Literal exp visitor function
     * @param numLiteral Numeric Literal exp
     */
    visitNumericLiteral( numLiteral: NumericLiteral): void;

    /**
     * Plus exp visitor function
     * @param plusExp Plus exp
     */
    visitPlusExpr(plusExp: PlusExpr):void;

    /**
     * Sequence statement visitor function
     * @param seq sequence statement
     */
    visitSequence(seq: Sequence): void;

    /**
     * String Literal exp visitor function
     * @param strLiteral String Literal exp
     */
    visitStringLiteral( strLiteral: StringLiteral): void;


    /**
     * Varibale visitor function
     * @param varExp varibale
     */
    visitVarExpr(varExp: VarExpr):void;


}


export default ASTVisitor;