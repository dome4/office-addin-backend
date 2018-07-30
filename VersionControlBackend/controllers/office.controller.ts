import * as XMLSerializer from '@harrison-ifeanyichukwu/xml-serializer';
import { JSDOM } from 'jsdom';
import { Router } from 'express';
import { Model, Promise } from 'mongoose';
const jwt = require('jsonwebtoken');
var env = require('dotenv').load();

/**
 * 
 * 
 */
export class OfficeController {

    /**
     * insert requirment template in xml document
     * 
     * @param req HttpRequest
     * @param res HttpResponse
     */
    insertNextRequirement(req, res) {

        // request needs two variables
        let requiremenXmlTemplate: string;
        let xmlDocument: string;

        try {

            requiremenXmlTemplate = req.body.requiremenTemplate;
            xmlDocument = req.body.xmlDocument;
        } catch (error) {

            res.json({ success: false, message: 'xml files not valid' });
        }

        // check the given params
        if (!requiremenXmlTemplate || !xmlDocument) {
            res.status(404).json({ success: false, message: 'Params missing' });
            return;
        }


        /*
         * insert the missing xml namespace to prevent DOMParser from creating invalid xml
         * only the first occurrence of 'pkg:package' is replaced
         */
        xmlDocument = xmlDocument.replace('pkg:package', 'pkg:package xmlns:xml="http://www.w3.org/XML/1998/namespace"');

        /*
         * create dom object and parse the xml - start        
         */
        // create dom object
        const dom = new JSDOM();

        const xml = new dom.window.DOMParser().parseFromString(xmlDocument, 'text/xml')

        // check for parse errors
        const parseError = xml.getElementsByTagName('parsererror')
        if (parseError.length != 0) {

            // parserError is of type HTMLCollection {}
            throw new Error('xml parseError occured' + parseError);
        }
        /*
         * create dom object and parse the xml - start
         */



        /*
         * find the last requirement - start
         */
        // get last w:p of a requirement    
        let findReqEnd = x => (
            x.childNodes[0].nodeValue.replace(/\s/g, '').includes('{"requirement-id":')
            && x.childNodes[0].nodeValue.replace(/\s/g, '').includes('"end"}')
        );

        // w:p node is two nodes above
        let findParagraphParent = x => x.parentNode.parentNode.nodeName.replace(/\s/g, '') === 'w:p';

        // map to the parent node w:p
        let getParentNode = x => x = x.parentNode.parentNode;

        // run function chain
        let nodes = Array.from(xml.getElementsByTagName('w:t'))
            .filter(findReqEnd)
            .filter(findParagraphParent)
            .map(getParentNode)
        /*
         * find the last requirement - end
         */


        /*
         * change the current doc - start
         */
        // last node
        let lastNode = nodes[nodes.length - 1];

        // node to insert // debug node -> for loop to insert all necessary nodes
        let newNode = xml.createElement("w:t");

        // insert new node before last node's next sibling
        var insertedNode = lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
        /*
         * change the current doc -end
         */


        //serialize changed xml file
        let xmlResult = new XMLSerializer().serializeToString(xml);

        // return serialized and updated file
        res.send(xmlResult);
    }


    /**
     * router for office controller
     * 
     */
    route() {
        const router = new Router();

        // insert requirment template in xml document
        router.post("/", (req, res) => {
            this.insertNextRequirement(req, res);
        });

        return router;
    }
}