/**
 *  Interface for errors - provides a method that produces 
 *  a human-readable representation of the error message.
 */
interface ITypeCheckError{
    toString(): String
}

export default ITypeCheckError;