import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import TypeCheckVisitor from '../src/TypeCheckVisitor'


describe("TypeCheckVisitorTests", () => {
    
    it("type-check a small AST with both kinds of errors", () => {
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
        let y = new DeclStmt("y");
        let one = new NumericLiteral(1); 
        let two = new StringLiteral("foo"); 
        let exp1 = new PlusExpr(one, two);
        let exp2 = new NumericLiteral(3); 
        let assign1 = new Assignment("x", exp1);
        let assign2 = new Assignment("y", exp2);
        let code = new Sequence(x1, new Sequence(x2, new Sequence(y, new Sequence(assign1, assign2))))
        let tcVisitor = new TypeCheckVisitor();
        code.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x",
                        "Type error in expression: 1 + \"foo\""]; 
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);  // both errors
    })

    it("Check for duplicate variable declaration error", ()=>{
        let x1 = new DeclStmt("x");
        let x2 = new DeclStmt("x");
        let exp = new PlusExpr(x1,x2);
        let tcVisitor = new TypeCheckVisitor();
        exp.accept(tcVisitor);
        let expected = ["Duplicate variable declaration: x"]
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    })

    it("Check for type error", ()=>{
        let x1 = new NumericLiteral(10);
        let x2 = new StringLiteral("Hello");
        let exp = new PlusExpr(x1,x2);
        let tcVisitor = new TypeCheckVisitor();
        exp.accept(tcVisitor);
        let expected = ["Type error in expression: 10 + \"Hello\""]
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    })

    it("Check for empty array if no errors", ()=>{
        let x1 = new NumericLiteral(10);
        let x2 = new NumericLiteral(11);
        let exp = new PlusExpr(x1,x2);
        let tcVisitor = new TypeCheckVisitor();
        exp.accept(tcVisitor);
        let expected = new Array<String>() 
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    })

    it("Check for no error is generated if varibale is added to Numeric literal", ()=>{
        let ten = new NumericLiteral(10);
        let x1 = new DeclStmt("x");
        let exp = new PlusExpr(x1,ten);
        let tcVisitor = new TypeCheckVisitor();
        exp.accept(tcVisitor);
        let expected = new Array<String>() 
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    })

    it("Check for no error is generated if varibale is added to String literal", ()=>{
        let str = new StringLiteral("hello");
        let x1 = new DeclStmt("x");
        let exp = new PlusExpr(x1,str);
        let tcVisitor = new TypeCheckVisitor();
        exp.accept(tcVisitor);
        let expected = new Array<String>() 
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    })

    it("calling typechecker on another statement sequence", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("y");
        let a3 = new StringLiteral("zip");
        let a4 = new NumericLiteral(8);
        let a5 = new Assignment("x", a3);
        let a6 = new Assignment("y", a4);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
        let tcVisitor = new TypeCheckVisitor();
        seq.accept(tcVisitor);
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        let expected = new Array<String>();
        expect(errors).to.have.same.members(expected);
    });

    it("calling typechecker for multiple errors", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("x");
        let a3 = new StringLiteral("zip");
        let a4 = new NumericLiteral(8);
        let plusExp = new PlusExpr(a4, a3 )
        let a5 = new Assignment("x", plusExp);
        let b1 = new DeclStmt("y");
        let b2 = new DeclStmt("y")
        let plusExp2 = new PlusExpr(b1, b2 )
        let a6 = new Assignment("y", plusExp2);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
        let tcVisitor = new TypeCheckVisitor();
        seq.accept(tcVisitor);
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        let expected = [
            'Duplicate variable declaration: x',
            'Type error in expression: 8 + \"zip\"',
            'Duplicate variable declaration: y'
          ]
        expect(errors).to.have.same.members(expected);
    });

    it("calling Type cheker on + expression with two mixed args", () => {
        let a1 = new StringLiteral("zip");
        let a2 = new NumericLiteral(8);
        let plus = new PlusExpr(a1, a2);      
        let tcVisitor = new TypeCheckVisitor();
        plus.accept(tcVisitor);
        let expected = ["Type error in expression: \"zip\" + 8"]
        let errors = tcVisitor.getErrors().map((err) => err.toString())
        expect(errors).to.have.same.members(expected);
    });

})