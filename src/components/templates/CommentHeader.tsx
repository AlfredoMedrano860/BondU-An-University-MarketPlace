interface CommentHeaderProps {
  name: string;
  avatar: string;
}

function CommentHeader({ name, avatar }: CommentHeaderProps) {
    return (
    <div className="bg-white px-6 pt-4 pb-4 rounded-2xl m-4">
    <div className="flex items-center gap-3">
      <div className="w-12.5 h-12.5 rounded-full overflow-hidden shrink-0">
        <img
          src={avatar}
          alt="user"
          className="w-full h-full object-cover"
        />
      </div>

        <h3 className="text-2xl font-bold text-lime-600">
          {name}
        </h3>
    </div>

  </div>
    );
}

export default CommentHeader;