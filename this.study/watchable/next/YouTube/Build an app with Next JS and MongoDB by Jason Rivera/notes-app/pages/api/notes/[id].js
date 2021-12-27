import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async function handler(req, res) {
  const {
    method,
    query: { id }
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!note) {
          res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
}
