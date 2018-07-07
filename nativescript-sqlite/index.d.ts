// declare var require: NodeRequire;
// declare var java: any;
// declare var exports: any;
// declare var android: any;
// declare var module: NodeModule;
// declare var appModule: any;
// declare var _DatabasePluginInits: any[];
// declare enum Db {
//     RESULTSASARRAY = 1,
//     RESULTSASOBJECT = 2,
//     VALUESARENATIVE = 4,
//     VALUESARESTRINGS = 8,
// }

// /***
//  * Parses a Row of data into a JS Array (as Native)
//  * @param cursor {Object}
//  * @returns {Array}
//  */
// declare function DBGetRowArrayNative(cursor: any): any[];
// /***
//  * Parses a Row of data into a JS Array (as String)
//  * @param cursor
//  * @returns {Array}
//  */
// declare function DBGetRowArrayString(cursor: any): Array<any>;
// /***
//  * Parses a Row of data into a JS Object (as Native)
//  * @param cursor
//  * @returns {{}}
//  */
// declare function DBGetRowObjectNative(cursor: any): {};
// /***
//  * Parses a Row of data into a JS Object (as String)
//  * @param cursor
//  * @returns {{}}
//  */
// declare function DBGetRowObjectString(cursor: any): {};
// declare var DBGetRowResults: typeof DBGetRowArrayNative;
// declare function setResultValueTypeEngine(resultType: any, valueType: any): void;
// /**
//  * gets the current application context
//  * @returns {*}
//  * @private
//  */
// declare function _getContext(): any;
// /** Uses a SQLite Plugin **/
// declare function UsePlugin(loadedSrc: any, DBModule: any): void;
// declare function TryLoadingCommercialPlugin(): void;
// declare function TryLoadingEncryptionPlugin(): void;

declare module "nativescript-sqlite" {
    namespace Sqlite {
        function isSqlite(db: any): boolean;

        /**
         * @returns True if the database exists in the 
         * App/OS Database folder.
         */
        function exists(dbName: string): boolean;
        /**    
         * database name to delete in the App/OS 
         * Database folder.
         * @returns void
         */
        function deleteDatabase(dbName: string): void;

        /**
         * database name to copy from your app folder 
         * to the proper database folder on the OS
         * This will only copy the file if it does not 
         * already exist at the destination.
         * @returns True if copy was successful
         */
        function copyDatabase(dbName: string): boolean;

    }

    class Sqlite extends Promise<Database> {

        constructor(dbName: string, callback?: (err, db: Database) => void);
        constructor(dbName: string, options: any, callback?: (err, db: Database) => void);

    }



    export = Sqlite;
}

declare class Database {
    /**
     * Value to set it to, or a Callback for retrieving
     * the value. If Callback Value will have the version.
     * On a new Database it will be Zero If Version number,
     * then the database will be changed to the version you
     * passed to this function.
     */
    version(version: ((err, ver) => void) | number): Promise<any>;
    /**
    * Is the database currently open
    * @returns {boolean} - true if the db is open
    */
    isOpen(): boolean;

    /**
     * Closes the database.
     * 
     * NOTE: Any DB calls after this will throw errors.
     */
    close(): Promise<any>

    /**
     * 
     * @param statement SQL statement to run, can use ? for Parameters
     * @param params Params (Optional) - an array of Parameters
     * @param callback Callback will either return null or the last id
     * inserted or the record count of update/delete This routine you can
     * use for "update", "insert", "delete" and any other sqlite command
     * where you are not expecting a result set back. If this is a Insert
     * it will return the last row id of the new inserted record. If it is
     * a update/insert it will return the number of rows affected.
     * @returns {Promise} A promise with the id.
     */
    execSQL(statement: string, callback?: (err, id: number) => void): void;
    execSQL(statement: string, params?: any[], callback?: (err, id: number) => void): Promise<number>;

    /**
     * SQL SELECT statement, can use ? for parameters
     * @param params (Optional)
     * @param callback Will have the first row of the result set.
     * @returns {Promise} A primise with the first row.
     */
    get(statement: string, params?: any[]): Promise<any>;
    get(statement: string, params?: any[], callback?: (err, row) => void): void;

    /**
     * @param statement SQL SELECT statement, can use ? for parameters
     * @param params (Optional)
     * @param callback will have the all the rows of the result set.
     * @returns Promise, will have all the rows of the result set.
     */
    all(statement: string, params?: any[]): Promise<any[]>;
    all(statement: string, params?: any[], callback?: (err, resultSet) => void): void;

    /**
     * @param statement SQL Select statement, can use ? for parameters
     * @param params (Optional)
     * Callback (REQUIRED) will be called for EACH row of the result set with the current row value
     * Finished_Callback (Optional) will be called when it is complete with the number of rows handled.
     * @returns Promise; please note the per row CALLBACK is still required; otherwise you won't have any results...
     */
    each(statement: string, callback: (err, row) => void, finishedCallback?: (err, count) => void): Promise<any>;
    each(statement: string, params?: any[], callback?: (err, row) => void): Promise<any>;
}
