import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, Users, User, ChevronDown } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { RegistrationSuccess } from '../components/RegistrationSuccess';
import { ParticlesBackground } from '../components/ParticlesBackground';
import toast from 'react-hot-toast';

interface TeamMember {
  name: string;
  branch: string;
  section: string;
  rollNumber: string;
  phone: string;
  email: string;
}

interface TeamFormData {
  teamName: string;
  totalMembers: number;
  teamLead: TeamMember;
  members: TeamMember[];
}

const emptyMember = (): TeamMember => ({
  name: '',
  branch: '',
  section: '',
  rollNumber: '',
  phone: '',
  email: ''
});

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const track = location.state?.track;
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<TeamFormData>({
    teamName: '',
    totalMembers: 3,
    teamLead: emptyMember(),
    members: [emptyMember(), emptyMember()]
  });

  if (!track) {
    navigate('/tracks');
    return null;
  }

  const handleTeamLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      teamLead: { ...prev.teamLead, [name]: value }
    }));
  };

  const handleMemberChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((member, i) => 
        i === index ? { ...member, [name]: value } : member
      )
    }));
  };

  const handleTotalMembersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const total = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      totalMembers: total,
      members: Array(total - 1).fill(null).map((_, i) => 
        prev.members[i] || emptyMember()
      )
    }));
  };

  const renderMemberFields = (member: TeamMember, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={member.name}
          onChange={onChange}
          className="input-field"
          placeholder="Enter full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Branch <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="branch"
          required
          value={member.branch}
          onChange={onChange}
          className="input-field"
          placeholder="Enter branch"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Section <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="section"
          required
          value={member.section}
          onChange={onChange}
          className="input-field"
          placeholder="Enter section"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Roll Number <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="rollNumber"
          required
          value={member.rollNumber}
          onChange={onChange}
          className="input-field"
          placeholder="Enter roll number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={member.phone}
          onChange={onChange}
          className="input-field"
          placeholder="+91 98765 43210"
          pattern="[0-9+ -]+"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={member.email}
          onChange={onChange}
          className="input-field"
          placeholder="email@example.com"
        />
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <RegistrationSuccess onClose={() => navigate('/')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden py-20 px-4">
      <ParticlesBackground />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Glowing orb background effects */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="glass-card p-8 md:p-12 backdrop-blur-lg border border-white/10 relative overflow-hidden">
            {/* Header */}
            <div className="mb-12 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Register for {track.title}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {track.description}
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Team Details */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  <Users className="w-6 h-6 text-blue-400" />
                  Team Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.teamName}
                      onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                      className="input-field"
                      placeholder="Enter team name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Total Members <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.totalMembers}
                        onChange={handleTotalMembersChange}
                        className="input-field appearance-none pr-10 bg-white/5 hover:bg-white/10 focus:bg-white/10 transition-colors cursor-pointer"
                        required
                      >
                        <option value={3}>3 Members</option>
                        <option value={4}>4 Members</option>
                        <option value={5}>5 Members</option>
                      </select>
                      <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Team Lead Details */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  <User className="w-6 h-6 text-blue-400" />
                  Team Lead Details
                </h2>
                <div className="glass-card p-6 backdrop-blur-sm">
                  {renderMemberFields(formData.teamLead, handleTeamLeadChange)}
                </div>
              </motion.div>

              {/* Team Members */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Team Members
                </h2>
                {formData.members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass-card p-6 backdrop-blur-sm relative overflow-hidden group hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h3 className="text-xl font-medium mb-6 text-blue-400">Member {index + 2}</h3>
                    {renderMemberFields(member, (e) => handleMemberChange(index, e))}
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0 group-hover:translate-x-full transition-transform duration-500"></div>
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={499}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </div>
  );
}