import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';
import CountVisitor from '../src/CountVisitor'


describe("StmtIteratorTests", () => {
    it("iterator through the statements of a small AST", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let exp = new PlusExpr(one, three);
        let decl = new DeclStmt("x");
        let assign = new Assignment("x", exp);
        let seq = new Sequence(decl, assign);    
        let it = seq.stmtIterator();
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("x = 1 + 3");
        expect(it.hasNext()).to.equal(false);
    })

    it("iterator through AST with no statements", () => {
        let one = new NumericLiteral(1);
        let three = new NumericLiteral(3); 
        let exp = new PlusExpr(one, three);
        let it = exp.stmtIterator();
        expect(it.hasNext()).to.equal(false)
        expect(it.next()).to.equal(undefined)
    })

    it("iterator through AST to check no sequence is selected", () => {
        let declX = new DeclStmt("x");
        let declY = new DeclStmt("y");
        let eight = new NumericLiteral(8);
        let assign1 = new Assignment("x", eight);
        let seq1 = new Sequence(declX, assign1);
        let seq2  = new Sequence(seq1,  declY);
        let it = seq2.stmtIterator();

        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("x = 8");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare y");
        expect(it.hasNext()).to.equal(false);
    })


    it("iterator through AST with", () => {
        let declX = new DeclStmt("x");
        let declY = new DeclStmt("y");
        let eight = new NumericLiteral(8);
        let assign1 = new Assignment("x", eight);
        let seq1 = new Sequence(declX, assign1);
        let seq2  = new Sequence(seq1,  declY);
        let it = seq2.stmtIterator();

        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("x = 8");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare y");
        expect(it.hasNext()).to.equal(false);
    })

    it("iterator hasNext method returns false if there is no next node", () => {
        let declX = new DeclStmt("x");
        let it = declX.stmtIterator();

        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(false);
    })

    it("iterator next method returns undefined if there is no next node", () => {
        let declX = new DeclStmt("x");
        let it = declX.stmtIterator();

        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(false);
        expect(it.next()).to.equal(undefined);
    })


    it("calling iterator on another statement sequence", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("y");
        let a3 = new StringLiteral("zip");
        let a4 = new NumericLiteral(8);
        let a5 = new Assignment("x", a3);
        let a6 = new Assignment("y", a4);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
   
        let it = seq.stmtIterator();
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare x");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("declare y");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("x = \"zip\"");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("y = 8");
        expect(it.hasNext()).to.equal(true);
        expect(it.next().text()).to.equal("y = x");
        expect(it.hasNext()).to.equal(false);
    });

    it("calling iterator on + expression with two mixed args", () => {
        let a1 = new StringLiteral("zip");
        let a2 = new NumericLiteral(8);
        let plus = new PlusExpr(a1, a2);
        let it = plus.stmtIterator();
        expect(it.hasNext()).to.equal(false);
        expect(it.next()).to.equal(undefined);
    });

})