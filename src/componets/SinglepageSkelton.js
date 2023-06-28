import {
  FaPlay,
  FaHeart,
  FaSave,
  FaComment,
  FaCopy,
  FaShare,
} from "react-icons/fa";
function SinglepageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-1/2 bg-gray-200  dark:bg-gray-700  mb-4"></div>
      <div className="flex mt-1 mb-2 gap-2">
        <div class="h-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-14"></div>
        <div class="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-16"></div>
        <div class="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-20"></div>
      </div>
      <div className="mt-5 mb-5 flex justify-between">
        <div className="flex gap-7">
          <FaHeart className="w-7 h-7  text-gray-200 dark:text-gray-700" />
          <FaComment className="w-7 h-7  text-gray-200 dark:text-gray-700" />
        </div>
        <div className="flex gap-7">
          // <FaShare className="w-7 h-7  text-gray-200 dark:text-gray-700" />
          <FaSave className="w-7 h-7  text-gray-200 dark:text-gray-700" />
          <FaPlay className="w-7 h-7  text-gray-200 dark:text-gray-700" />
          <FaCopy className="w-7 h-7  text-gray-200 dark:text-gray-700" />
        </div>
      </div>
      <div className="h-56 w-full bg-gray-200  dark:bg-gray-700  mb-2"></div>
      <div className="mx-2">
        <div className="h-96 w-full bg-gray-200  dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default SinglepageSkeleton;
