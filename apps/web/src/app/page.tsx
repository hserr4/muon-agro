import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-9a5.002 5.002 0 012.386 7.75M10 12l3-9" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold text-[#1a472a] block leading-tight">Muon</span>
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">Agro</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#1a472a] transition-colors">Funcionalidades</a>
            <a href="#benefits" className="text-gray-600 hover:text-[#1a472a] transition-colors">Benefícios</a>
            <a href="#pricing" className="text-gray-600 hover:text-[#1a472a] transition-colors">Planos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-[#1a472a] transition-colors">Depoimentos</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-gray-600 hover:text-[#1a472a] font-medium">Entrar</Link>
            <Link href="/register">
              <Button className="bg-[#1a472a] hover:bg-[#143d22]">Começar Grátis</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#f8faf9] via-white to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#1a472a]/10 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-[#1a472a] font-medium">Mais de 1.500 fazendas utilizando</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#1a472a] leading-tight mb-6">
              A gestão que sua fazenda
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a472a] to-[#d4af37]"> merece</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Sistema completo de gestão agro com inteligência de dados. 
              Reduza custos, aumente produtividade e tome decisões baseadas em evidências reais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-[#1a472a] hover:bg-[#143d22] text-lg px-8 h-14">
                  Experimentar 30 dias grátis
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 border-2 border-[#1a472a]/20">
                Ver demonstração
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancelamento fácil</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Suporte dedicado</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white z-10 h-20 bottom-0"></div>
            <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">Dashboard - Muon Agro</span>
              </div>
              <div className="p-6 bg-gray-50 grid grid-cols-4 gap-4">
                {[
                  { label: 'Animais', value: '1.247', change: '+12%' },
                  { label: 'Lotes', value: '8', change: '+3%' },
                  { label: 'Receita (mês)', value: 'R$ 142K', change: '+28%' },
                  { label: 'Custo/cabeça', value: 'R$ 312', change: '-8%' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#1a472a]">{stat.value}</p>
                    <p className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#1a472a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '+1.500', label: 'Fazendas cadastradas', suffix: '' },
              { value: '+50mil', label: 'Animais gerenciados', suffix: '' },
              { value: '-18%', label: 'Custo médio reduzido', suffix: '' },
              { value: '+25%', label: 'Produtividade média', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="text-white">
                <div className="text-3xl md:text-4xl font-bold text-[#d4af37]">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a472a] mb-4">
              Tudo que você precisa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Módulos completos para gerenciar cada aspecto da sua fazenda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🐄', title: 'Gestão de Rebanho', desc: 'Cadastro completo, QR Code, pesagem, lotação e cálculo automático de GMD', color: 'bg-blue-50' },
              { icon: '📊', title: 'Dashboard Inteligente', desc: 'Métricas em tempo real, gráficos e alertas automáticos', color: 'bg-green-50' },
              { icon: '🌾', title: 'Controle agrícola', desc: 'Talhões, safras, produtividade e gestão de insumos', color: 'bg-yellow-50' },
              { icon: '💰', title: 'Fluxo de Caixa', desc: 'Receitas, despesas, DRE e projeções de lucro', color: 'bg-purple-50' },
              { icon: '📦', title: 'Estoque', desc: 'Controle de rações, insumos e alertas de reposição', color: 'bg-orange-50' },
              { icon: '👥', title: 'Gestão de Pessoas', desc: 'Funcionários, tarefas e controle de custos', color: 'bg-pink-50' },
              { icon: '🔧', title: 'Manutenção', desc: 'Máquinas, histórico e cronograma preventivo', color: 'bg-indigo-50' },
              { icon: '🤖', title: 'AI Insights', desc: 'Análises automáticas e recomendações', color: 'bg-cyan-50' },
              { icon: '📱', title: 'App Mobile', desc: 'Use offline no campo, sincronize automatic', color: 'bg-teal-50' },
            ].map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1a472a] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1a472a] mb-6">
                Por que escolher o Muon Agro?
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Decisões baseadas em dados', desc: 'Dashboards em tempo real com métricas importantes para o seu negócio' },
                  { title: 'Funciona offline', desc: 'Use no campo sem internet, sincronize quando conectar' },
                  { title: 'Fácil de usar', desc: 'Interface simples, desenvolvida para quem trabalha no campo' },
                  { title: 'Suporte dedicado', desc: 'Time sempre pronto para ajudar você a cada etapa' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#1a472a] text-white flex items-center justify-center flex-shrink-0 text-sm">✓</div>
                    <div>
                      <h4 className="font-semibold text-[#1a472a]">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-[#1a472a] mb-6">Exemplo de Economia</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Custo por cabeça (antes)</span>
                  <span className="font-bold">R$ 420</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">Custo por cabeça (depois)</span>
                  <span className="font-bold text-green-600">R$ 345</span>
                </div>
                <div className="flex justify-between py-3 bg-[#1a472a]/10 rounded-lg px-4 -mx-4">
                  <span className="font-bold text-[#1a472a]">Economia por cabeça</span>
                  <span className="font-bold text-[#d4af37]">R$ 75</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                *Baseado em dados reais de fazendas que utilizam o Muon Agro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a472a] mb-4">
              Planos acessíveis para cada tahap
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o tamanho da sua operação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Básico',
                price: 199,
                features: ['500 animais', '10 talhões', '3 usuários', 'Gestão básica', 'Suporte por email'],
                popular: false,
              },
              {
                name: 'Profissional',
                price: 499,
                features: ['2.000 animais', '50 talhões', '10 usuários', 'AI Insights', 'API Access', 'Suporte prioritário'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 999,
                features: ['Animais ilimitados', 'Talhões ilimitados', 'Usuários ilimitados', 'White label', 'SLA garantido', 'Suporte 24/7'],
                popular: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-[#1a472a] text-white shadow-2xl scale-105' : 'bg-white border shadow-lg'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black px-4 py-1 rounded-full text-sm font-bold">
                    Mais Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-[#1a472a]'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-[#1a472a]'}`}>
                    R$ {plan.price}
                  </span>
                  <span className={plan.popular ? 'text-white/80' : 'text-gray-500'}>/mês</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg className={`w-5 h-5 ${plan.popular ? 'text-[#d4af37]' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-[#d4af37] hover:bg-[#c4a027] text-black' : 'bg-[#1a472a] hover:bg-[#143d22]'}`}
                >
                  Começar agora
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a472a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para modernizar sua fazenda?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Junte-se a mais de 1.500 produtores que já economizam tempo e dinheiro com o Muon Agro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#d4af37] hover:bg-[#c4a027] text-black text-lg px-8">
              Experimentar grátis por 30 dias
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white/10">
              Falar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-9a5.002 5.002 0 012.386 7.75M10 12l3-9" />
                </svg>
              </div>
              <span className="text-white font-bold">Muon Agro</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white">Termos</a>
              <a href="#" className="hover:text-white">Privacidade</a>
              <a href="#" className="hover:text-white">Contato</a>
            </div>
            <p className="text-sm">© 2024 Muon Agro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}