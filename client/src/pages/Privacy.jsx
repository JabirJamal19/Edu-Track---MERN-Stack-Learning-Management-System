import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { Shield, Lock, Eye, UserCheck, Database, Mail } from 'lucide-react'

const Privacy = () => {
  const highlights = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'Your data is encrypted and stored securely',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'We never sell your personal information',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear information about how we use your data',
    },
    {
      icon: UserCheck,
      title: 'Your Control',
      description: 'You control your data and privacy settings',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-100">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to EduTrack ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Profile information (bio, profile picture, educational background)</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
              <li>Course enrollment and progress data</li>
              <li>Communications with us and other users</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you use our services, we automatically collect:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, courses viewed)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Log data (access times, error logs)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about courses, features, and promotional offers</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              <li>Personalize your learning experience and recommend relevant content</li>
            </ul>

            <h2>4. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li><strong>With Instructors:</strong> Course enrollment and progress data</li>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our platform</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection</li>
              <li>Regular backups and disaster recovery procedures</li>
            </ul>

            <h2>6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
            </ul>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and track information about your browsing activities. You can control cookies through your browser settings and other tools. However, blocking cookies may affect your ability to use certain features of our services.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any information.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete it promptly.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>11. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>

            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <div className="flex items-start space-x-3 mb-3">
                <Mail className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">privacy@edutrack.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Database className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p className="font-semibold">Data Protection Officer</p>
                  <p className="text-gray-600">dpo@edutrack.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Questions about our privacy practices?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            We're here to help. Contact our support team for any privacy-related inquiries.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
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

export default Privacy
