import ManageCollectionImages from "../ManageCollectionImages/ManageCollectionImages";
import { useParams } from "react-router-dom";

const EditCollection = () => {
    const { id } = useParams();

    return (
        <div>
            {/* Your existing form for editing collection details */}
            <h2>Edit Collection</h2>
            <form>
                {/* Other form fields */}
            </form>

            {/* Add the ManageCollectionImages component */}
            <ManageCollectionImages collectionId={id} />
        </div>
    );
};

export default EditCollection;
