package umm3601.report;

import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import javax.sound.midi.Track;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Map;
import java.util.Date;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about trackers.
 */
public class ReportController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> reportCollection;

    /**
     * Construct a controller for trackers.
     *
     * @param database the database containing tracker data
     */
    public ReportController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        reportCollection = database.getCollection("trackers");
    }




    /** Helper method which iterates through the collection, receiving all
     * documents if no query parameter is specified. If the age query parameter
     * is specified, then the collection is filtered so only documents of that
     * specified age are found.
     *@todo Need to figure out the user side of this.
     * @param queryParams
     * @return an array of Trackers in a JSON formatted string
     */
    public String getReports(Map<String, String[]> queryParams) {

        Document filterDoc = new Document();


        //FindIterable comes from mongo, Document comes from Gson
        FindIterable<Document> matchingTrackers = reportCollection.find(filterDoc);

        return JSON.serialize(matchingTrackers);
    }



}
