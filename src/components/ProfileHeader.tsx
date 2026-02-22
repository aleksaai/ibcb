import crossIcon from "@/assets/cross-icon.png";

interface ProfileHeaderProps {
  name: string;
  title?: string;
  description?: string;
  avatar?: string;
}
export function ProfileHeader({
  name,
  title,
  description,
  avatar
}: ProfileHeaderProps) {
  return <div className="text-center mb-8">
      {/* Profile Avatar */}
      <div className="mb-4">
        <div className="w-24 h-24 mx-auto mb-4 relative">
          {avatar ? <img src={avatar} alt={name} className="w-full h-full object-cover rounded-full border-4 border-white/50 shadow-xl backdrop-blur-sm" /> : <div className="w-full h-full bg-gray-200 rounded-full border-4 border-white shadow-md flex items-center justify-center">
              <div className="text-xl font-semibold text-gray-600">
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>}
          {/* Removed online indicator */}
        </div>
      </div>

      {/* Name and handle */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-xl font-semibold text-black">
            {name}
          </h1>
          <img src={crossIcon} alt="Cross" className="w-6 h-6 object-contain" />
        </div>
        <p className="text-sm text-gray-600 mb-4">International Baptist Church of Budapest</p>
        
        
        {description}
      </div>
    </div>;
}