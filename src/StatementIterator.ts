import IIterator from './IIterator'
import Stmt from './Stmt'

/**
 * class implements IIterator interface.
 * Provides iterator functions for all statement nodes collected.
 */
class StatementIterator implements IIterator<Stmt> {

    //List of nodes- statements
    private listOfStatements: Array<Stmt>;
    constructor(stat : Array<Stmt>){
        this.listOfStatements = stat
    }

    /**
     * Function to return true if more statements are present
     * else return false
     */
    public hasNext() : boolean {
        if(this.listOfStatements.length==0){
            return false;
        }
        return true;
    }

    /**
     * Returns the statement in the list
     */
    public next() : Stmt {
        return this.listOfStatements.shift();
    }


}

export default StatementIterator;