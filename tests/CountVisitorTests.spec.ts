import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import CountVisitor from '../src/CountVisitor'

describe("CountVisitorTests", () => {
    it("count nodes in a small AST", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let exp = new PlusExpr(one, three);
        let decl = new DeclStmt("x");
        let assign = new Assignment("x", exp);
        let seq = new Sequence(decl, assign); 
        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(1);
        expect(countVisitor.getNrDeclStmt()).to.equal(1);
        expect(countVisitor.getNrNumericLiteral()).to.equal(2);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(1);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })

    it("count nodes for two seperate string literals", ()=>{
        let string1 = new StringLiteral("Hello");
        let string2 = new StringLiteral("world");
        let countVisitor1 = new CountVisitor();
        string1.accept(countVisitor1);
        let countVisitor2 = new CountVisitor();
        string2.accept(countVisitor2)
        expect(countVisitor1.getNrStringLiteral()).to.equal(1);
        expect(countVisitor2.getNrStringLiteral()).to.equal(1);
    })

    it("count nodes for string literals in single AST", ()=>{
        let string1 = new StringLiteral("Hello");
        let string2 = new StringLiteral("world");
        let plus = new PlusExpr(string1, string2);
        let countVisitor = new CountVisitor();
        plus.accept(countVisitor);
        expect(countVisitor.getNrStringLiteral()).to.equal(2);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
    })

    it("count nodes in sequence of sequence in an AST", ()=>{
        let declX = new DeclStmt("x");
        let declY = new DeclStmt("y");
        let eight = new NumericLiteral(8);
        let assign1 = new Assignment("x", eight);
        let seq1 = new Sequence(declX, assign1);
        let seq2  = new Sequence(seq1,  declY);
        let countVisitor = new CountVisitor();
        seq2.accept(countVisitor);
        
        expect(countVisitor.getNrAssignment()).to.equal(1);
        expect(countVisitor.getNrDeclStmt()).to.equal(2);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(2);
        expect(countVisitor.getNrStringLiteral()).to.equal(0);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })

    
    it("count nodes for plus exp of a numeric and string literal", ()=>{
        let eight = new NumericLiteral(8);
        let str1 = new StringLiteral("Hello")
        let stat = new PlusExpr(eight, str1);
        let countVisitor = new CountVisitor();
        stat.accept(countVisitor);
        
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    })


    it("calling count visitor on another statement sequence", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("y");
        let a3 = new StringLiteral("zip");
        let a4 = new NumericLiteral(8);
        let a5 = new Assignment("x", a3);
        let a6 = new Assignment("y", a4);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
        let countVisitor = new CountVisitor();
        seq.accept(countVisitor);

        expect(countVisitor.getNrAssignment()).to.equal(3);
        expect(countVisitor.getNrDeclStmt()).to.equal(2);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(4);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(1);
    });

    it("calling count visitor on + expression with two mixed args", () => {
        let a1 = new StringLiteral("zip");
        let a2 = new NumericLiteral(8);
        let plus = new PlusExpr(a1, a2);
        let countVisitor = new CountVisitor();
        plus.accept(countVisitor)
        expect(countVisitor.getNrAssignment()).to.equal(0);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(1);
        expect(countVisitor.getNrPlusExpr()).to.equal(1);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    });

    it("calling count visitor on nested assignment", () => {
        let a1 = new Assignment("y", new StringLiteral("foo"));
        let a2 = new Assignment("x", a1);
        let countVisitor = new CountVisitor();
        a2.accept(countVisitor);
        expect(countVisitor.getNrAssignment()).to.equal(2);
        expect(countVisitor.getNrDeclStmt()).to.equal(0);
        expect(countVisitor.getNrNumericLiteral()).to.equal(0);
        expect(countVisitor.getNrPlusExpr()).to.equal(0);
        expect(countVisitor.getNrSequence()).to.equal(0);
        expect(countVisitor.getNrStringLiteral()).to.equal(1);
        expect(countVisitor.getNrVarExpr()).to.equal(0);
    });




})