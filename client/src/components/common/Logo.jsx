import { GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const Logo = ({ size = 'normal', className = '' }) => {
  const sizes = {
    small: {
      icon: 'w-6 h-6',
      text: 'text-xl',
    },
    normal: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
    },
    large: {
      icon: 'w-12 h-12',
      text: 'text-4xl',
    },
  }

  const currentSize = sizes[size]

  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gradient-primary p-2 rounded-lg">
        <GraduationCap className={`${currentSize.icon} text-white`} />
      </div>
      <span className={`${currentSize.text} font-heading font-bold text-gradient`}>
        EduTrack
      </span>
    </Link>
  )
}

export default Logo
