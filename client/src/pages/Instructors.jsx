import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import ImageWithFallback from '../components/common/ImageWithFallback'
import { Star, BookOpen, Users, Award } from 'lucide-react'

const Instructors = () => {
  // Mock instructors data
  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Web Developer & Instructor',
      bio: 'With over 15 years of experience in web development, Sarah specializes in modern JavaScript frameworks and full-stack development.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      students: 45230,
      courses: 12,
      expertise: ['JavaScript', 'React', 'Node.js', 'Full Stack'],
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'Data Science Expert',
      bio: 'PhD in Computer Science with a focus on Machine Learning and AI. Michael has published over 50 research papers.',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=faces',
      rating: 4.8,
      students: 38910,
      courses: 8,
      expertise: ['Python', 'Machine Learning', 'Data Analysis', 'AI'],
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      title: 'UX/UI Design Lead',
      bio: 'Award-winning designer with experience at top tech companies. Emma believes in user-centered design principles.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      students: 52100,
      courses: 15,
      expertise: ['UI/UX Design', 'Figma', 'Design Systems', 'Prototyping'],
    },
    {
      id: 4,
      name: 'James Williams',
      title: 'Cloud Architecture Specialist',
      bio: 'AWS certified professional with extensive experience in cloud infrastructure and DevOps practices.',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces',
      rating: 4.7,
      students: 28450,
      courses: 10,
      expertise: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
    },
    {
      id: 5,
      name: 'Dr. Priya Patel',
      title: 'Mobile Development Expert',
      bio: 'Specializes in iOS and Android development. Creator of multiple award-winning mobile applications.',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=faces',
      rating: 4.8,
      students: 34720,
      courses: 11,
      expertise: ['iOS', 'Android', 'React Native', 'Flutter'],
    },
    {
      id: 6,
      name: 'Robert Martinez',
      title: 'Cybersecurity Consultant',
      bio: 'Former security analyst with 20+ years experience. Passionate about teaching ethical hacking and security best practices.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
      rating: 4.9,
      students: 41560,
      courses: 9,
      expertise: ['Security', 'Ethical Hacking', 'Network Security', 'Penetration Testing'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Learn from the Best
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Our expert instructors bring real-world experience and passion for teaching to help you succeed
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="card group hover:shadow-2xl transition-all">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full mb-4 ring-4 ring-primary-100 group-hover:ring-primary-200 transition-all overflow-hidden">
                    <ImageWithFallback
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{instructor.name}</h3>
                  <p className="text-primary-600 font-medium text-sm">{instructor.title}</p>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {instructor.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-yellow-500 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900">{instructor.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-4 h-4 text-primary-600 mr-1" />
                      <span className="font-semibold text-gray-900">
                        {(instructor.students / 1000).toFixed(1)}K
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Students</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <BookOpen className="w-4 h-4 text-primary-600 mr-1" />
                      <span className="font-semibold text-gray-900">{instructor.courses}</span>
                    </div>
                    <p className="text-xs text-gray-600">Courses</p>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Profile Button */}
                <Link
                  to={`/instructors/${instructor.id}`}
                  className="btn btn-outline w-full group-hover:btn-primary transition-all"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Instructor CTA */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Become an Instructor
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Share your knowledge with students around the world and earn money teaching what you love
          </p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Start Teaching Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400">
                Empowering learners worldwide with quality education
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/instructors" className="hover:text-white">Instructors</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Instructors
