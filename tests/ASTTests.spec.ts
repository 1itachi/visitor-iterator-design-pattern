import { expect } from 'chai';
import Assignment from '../src/Assignment';
import StringLiteral from '../src/StringLiteral'
import NumericLiteral from '../src/NumericLiteral'
import Sequence from '../src/Sequence';
import PlusExpr from '../src/PlusExpr'
import VarExpr from '../src/VarExpr'
import DeclStmt from '../src/DeclStmt';

describe("test the text() methods on AST nodes", () => {
    it("calling text() on assignment", () => {
        let a = new Assignment("x", new StringLiteral("foo"));
        expect(a.text()).to.equal("x = \"foo\"");
    });
    
    it("calling text() on nested assignment", () => {
        let a1 = new Assignment("y", new StringLiteral("foo"));
        let a2 = new Assignment("x", a1);
        expect(a2.text()).to.equal("x = y = \"foo\"");
    });

    it("calling text() on sequence of assignments", () => {
        let a1 = new Assignment("x", new StringLiteral("foo"));
        let a2 = new Assignment("y", new NumericLiteral(7));
        let seq = new Sequence(a1, a2);
        expect(seq.text()).to.equal("x = \"foo\"; y = 7");
    });

    it("calling text() on + expression with two numeric args", () => {
        let a1 = new NumericLiteral(7);
        let a2 = new NumericLiteral(8);
        let plus = new PlusExpr(a1, a2);
        expect(plus.text()).to.equal("7 + 8");
    });
    
    it("calling text() on + expression with two string args", () => {
        let a1 = new StringLiteral("zip");
        let a2 = new StringLiteral("zap");
        let plus = new PlusExpr(a1, a2);
        expect(plus.text()).to.equal("\"zip\" + \"zap\"");
    });

    it("calling text() on + expression with two mixed args", () => {
        let a1 = new StringLiteral("zip");
        let a2 = new NumericLiteral(8);
        let plus = new PlusExpr(a1, a2);
        expect(plus.text()).to.equal("\"zip\" + 8");
    });
    
    it("calling text() on a statement sequence", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("y");
        let a3 = new NumericLiteral(7);
        let a4 = new NumericLiteral(8);
        let a5 = new Assignment("x", a3);
        let a6 = new Assignment("y", a4);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
        expect(seq.text()).to.equal("declare x; declare y; x = 7; y = 8; y = x");
    });

    it("calling text() on another statement sequence", () => {
        let a1 = new DeclStmt("x");
        let a2 = new DeclStmt("y");
        let a3 = new StringLiteral("zip");
        let a4 = new NumericLiteral(8);
        let a5 = new Assignment("x", a3);
        let a6 = new Assignment("y", a4);
        let a7 = new Assignment("y", new VarExpr("x"));
        let seq = new Sequence(a1, new Sequence(a2, new Sequence(a5, new Sequence(a6, a7))));
        expect(seq.text()).to.equal("declare x; declare y; x = \"zip\"; y = 8; y = x");
    });
})