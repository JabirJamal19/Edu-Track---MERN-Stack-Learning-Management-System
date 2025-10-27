import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Logo from '../components/common/Logo'
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="w-20 h-20 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-100">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-gray-600 text-sm">Access to quality education and fair treatment</p>
            </div>
            <div className="card text-center">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Your Responsibilities</h3>
              <p className="text-gray-600 text-sm">Respect community guidelines and intellectual property</p>
            </div>
            <div className="card text-center">
              <Scale className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fair Use</h3>
              <p className="text-gray-600 text-sm">Use the platform ethically and legally</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card prose prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EduTrack ("Platform," "Service," "we," "our," or "us"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              EduTrack is an online learning platform that connects students with instructors offering various educational courses. We provide the technology and infrastructure to facilitate online learning but do not directly provide educational content.
            </p>

            <h2>3. User Accounts</h2>
            <h3>3.1 Account Creation</h3>
            <p>To access certain features, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h3>3.2 Account Types</h3>
            <p>We offer different account types:</p>
            <ul>
              <li><strong>Student Accounts:</strong> For learners enrolling in courses</li>
              <li><strong>Instructor Accounts:</strong> For educators creating and teaching courses</li>
              <li><strong>Admin Accounts:</strong> For platform administrators (by invitation only)</li>
            </ul>

            <h2>4. User Content and Conduct</h2>
            <h3>4.1 User Conduct</h3>
            <p>You agree NOT to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Upload malicious software or harmful code</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share account credentials</li>
              <li>Circumvent security features</li>
              <li>Scrape or download content without permission</li>
              <li>Engage in fraudulent activities</li>
            </ul>

            <h3>4.2 Content Ownership</h3>
            <p>
              You retain ownership of content you submit. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content in connection with our services.
            </p>

            <h2>5. Course Enrollment and Access</h2>
            <h3>5.1 Student Obligations</h3>
            <ul>
              <li>Students must pay applicable fees before accessing paid courses</li>
              <li>Course access is for personal, non-commercial use only</li>
              <li>Sharing course materials is prohibited</li>
              <li>Lifetime access means as long as the platform operates</li>
            </ul>

            <h3>5.2 Instructor Obligations</h3>
            <ul>
              <li>Instructors must provide accurate course descriptions</li>
              <li>Course content must be original or properly licensed</li>
              <li>Instructors must respond to student inquiries promptly</li>
              <li>Quality standards must be maintained</li>
            </ul>

            <h2>6. Payments and Refunds</h2>
            <h3>6.1 Pricing</h3>
            <p>
              Course prices are set by instructors and displayed in USD. Prices may change, but enrolled students pay the price at the time of purchase.
            </p>

            <h3>6.2 Payment Processing</h3>
            <p>
              Payments are processed through secure third-party providers. We do not store full payment card information on our servers.
            </p>

            <h3>6.3 Refund Policy</h3>
            <ul>
              <li>30-day money-back guarantee for most courses</li>
              <li>Refunds are at our discretion for specific circumstances</li>
              <li>Excessive refund requests may result in account suspension</li>
              <li>Refunds exclude transaction fees</li>
            </ul>

            <h3>6.4 Instructor Revenue</h3>
            <p>
              Instructors earn 70% of course sales (after payment processing fees). Payments are processed monthly with a minimum threshold of $50.
            </p>

            <h2>7. Intellectual Property</h2>
            <h3>7.1 Platform Content</h3>
            <p>
              All platform features, logos, and design elements are owned by EduTrack and protected by intellectual property laws.
            </p>

            <h3>7.2 Course Content</h3>
            <p>
              Course content is owned by instructors or licensed to them. Students may not reproduce, distribute, or create derivative works from course materials.
            </p>

            <h3>7.3 DMCA Policy</h3>
            <p>
              We respect intellectual property rights. If you believe content infringes your copyright, contact us at dmca@edutrack.com with:
            </p>
            <ul>
              <li>Description of the copyrighted work</li>
              <li>Location of the infringing material</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>Electronic signature</li>
            </ul>

            <h2>8. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that:</p>
            <ul>
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent activity</li>
              <li>Abuse or harass other users</li>
              <li>Remain inactive for extended periods</li>
            </ul>
            <p>
              Upon termination, you lose access to courses and content. Paid courses may not be refundable after termination for cause.
            </p>

            <h2>9. Disclaimers and Limitations</h2>
            <h3>9.1 Service "As Is"</h3>
            <p>
              The platform is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access, error-free operation, or specific learning outcomes.
            </p>

            <h3>9.2 Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, EduTrack shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.
            </p>

            <h3>9.3 Indemnification</h3>
            <p>
              You agree to indemnify and hold harmless EduTrack from any claims arising from your use of the platform or violation of these terms.
            </p>

            <h2>10. Dispute Resolution</h2>
            <h3>10.1 Informal Resolution</h3>
            <p>
              Before filing a claim, you agree to contact us to resolve the dispute informally. Contact us at legal@edutrack.com.
            </p>

            <h3>10.2 Arbitration</h3>
            <p>
              Any disputes will be resolved through binding arbitration, not in court, except where prohibited by law.
            </p>

            <h3>10.3 Class Action Waiver</h3>
            <p>
              You agree to resolve disputes individually, not as part of a class action or representative proceeding.
            </p>

            <h2>11. Modifications to Terms</h2>
            <p>
              We may modify these terms at any time. Material changes will be notified via email or platform notice. Continued use after changes constitutes acceptance of new terms.
            </p>

            <h2>12. General Provisions</h2>
            <h3>12.1 Governing Law</h3>
            <p>
              These terms are governed by the laws of the jurisdiction where EduTrack is incorporated, without regard to conflict of law provisions.
            </p>

            <h3>12.2 Severability</h3>
            <p>
              If any provision is found unenforceable, the remaining provisions continue in full force and effect.
            </p>

            <h3>12.3 Entire Agreement</h3>
            <p>
              These terms constitute the entire agreement between you and EduTrack regarding use of the platform.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              For questions about these terms, contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p><strong>Email:</strong> legal@edutrack.com</p>
              <p><strong>Address:</strong> 123 Learning Street, Education City, EC 12345</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>

            <div className="bg-primary-50 p-6 rounded-lg mt-8">
              <h3 className="text-primary-900 font-semibold mb-2">Acceptance</h3>
              <p className="text-primary-800">
                By clicking "Sign Up" or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Questions about our terms?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Our legal team is available to answer any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link to="/faq" className="btn btn-outline">
              View FAQ
            </Link>
          </div>
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

export default Terms
