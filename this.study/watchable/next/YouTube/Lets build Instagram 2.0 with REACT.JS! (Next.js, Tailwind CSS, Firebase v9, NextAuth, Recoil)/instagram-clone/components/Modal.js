import { useSession } from "next-auth/react";
import { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { doc } from "firebase/firestore";
import { firebaseFirestore, firebaseStorage } from "../firebase/config";
import { modalState } from "../atoms/modalAtom";

export function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  function addImageToPost(event) {
    const reader = new FileReader();

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  async function uploadPost() {
    if (loading) return;
    setLoading(true);

    // 1) Create a post and add to Firestore
    const docRef = await addDoc(collection(firebaseFirestore, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    });

    console.log("New doc added with ID", docRef.id);

    // 2) Upload the image to Firebase storage with the post id
    const imageRef = ref(firebaseStorage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url");

    // 3) Get a download URL from Firebase storage and update original post with URL
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(firebaseFirestore, "posts", docRef.id), {
      image: downloadURL
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex justify-center items-end min-h-[800px] px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-75 bg-gray-500" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => setSelectedFile(null)}
                    alt="Selected"
                  />
                ) : (
                  <div
                    className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <CameraIcon className="w-6 h-6 text-red-600" aria-hidden />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        onChange={addImageToPost}
                        hidden
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        ref={captionRef}
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
